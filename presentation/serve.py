#!/usr/bin/env python3
"""Static server that sets the COOP/COEP headers Lynx for Web needs.

Lynx's @lynx-js/web-core spins up the main thread + background thread as
Workers and shares state via SharedArrayBuffer. Modern Chromium requires
cross-origin isolation for SAB, which means the response carrying the page
must set:

    Cross-Origin-Opener-Policy:   same-origin
    Cross-Origin-Embedder-Policy: require-corp

Python's stdlib http.server doesn't do that, so we wrap it.
"""
import http.server
import socketserver
import os
import sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8090
DIR = os.path.dirname(os.path.abspath(__file__))


class CrossOriginIsolatedHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cross-Origin-Opener-Policy", "same-origin")
        self.send_header("Cross-Origin-Embedder-Policy", "require-corp")
        self.send_header("Cross-Origin-Resource-Policy", "same-origin")
        super().end_headers()

    def log_message(self, fmt, *args):
        # Keep the log compact
        sys.stderr.write("%s %s\n" % (self.address_string(), fmt % args))


def main():
    os.chdir(DIR)
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("127.0.0.1", PORT), CrossOriginIsolatedHandler) as srv:
        print(f"Serving {DIR} at http://127.0.0.1:{PORT}/ (COOP/COEP enabled)")
        try:
            srv.serve_forever()
        except KeyboardInterrupt:
            print("\nbye")


if __name__ == "__main__":
    main()
