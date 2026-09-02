from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import os


class RangeHandler(SimpleHTTPRequestHandler):
    def send_head(self):
        path = self.translate_path(self.path)
        if not os.path.isfile(path):
            return super().send_head()

        size = os.path.getsize(path)
        start, end = 0, size - 1
        raw_range = self.headers.get("Range")
        if raw_range and raw_range.startswith("bytes="):
            try:
                spec = raw_range[6:].split(",", 1)[0]
                left, right = (spec.split("-", 1) + [""])[:2]
                if left:
                    start = int(left)
                    end = int(right) if right else size - 1
                else:
                    length = int(right)
                    start = max(0, size - length)
                if start < 0 or start >= size or end < start:
                    raise ValueError
                end = min(end, size - 1)
            except (ValueError, TypeError):
                self.send_error(416, "Invalid byte range")
                return None

            self.send_response(206)
            self.send_header("Content-Range", f"bytes {start}-{end}/{size}")
        else:
            self.send_response(200)

        self.send_header("Content-type", self.guess_type(path))
        self.send_header("Accept-Ranges", "bytes")
        self.send_header("Content-Length", str(end - start + 1))
        self.send_header("Last-Modified", self.date_time_string(os.path.getmtime(path)))
        self.end_headers()
        if self.command == "HEAD":
            return None
        file = open(path, "rb")
        file.seek(start)
        self.range_start = start
        self.range_end = end
        return file

    def copyfile(self, source, outputfile):
        remaining = self.range_end - self.range_start + 1 if hasattr(self, "range_end") else None
        while remaining is None or remaining > 0:
            chunk = source.read(min(64 * 1024, remaining) if remaining else 64 * 1024)
            if not chunk:
                break
            outputfile.write(chunk)
            if remaining is not None:
                remaining -= len(chunk)


if __name__ == "__main__":
    root = Path(__file__).resolve().parent
    os.chdir(root)
    server = ThreadingHTTPServer(("127.0.0.1", 8765), RangeHandler)
    print(f"Serving {root} at http://127.0.0.1:8765")
    server.serve_forever()
