# server.py - Simple Python server for JOKIINAJA
from http.server import HTTPServer, SimpleHTTPRequestHandler
import json
import os
from datetime import datetime

class CORSRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()
    
    def do_GET(self):
        if self.path == '/api/testimonials':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            
            testimonials = [
                {
                    "id": 1,
                    "name": "Rina Sari",
                    "role": "Mahasiswa Teknik Informatika - UI",
                    "rating": 5,
                    "content": "Deadline project Python tinggal 3 hari, panik banget! Hasilnya luar biasa, code clean, dokumentasi lengkap.",
                    "service": "programming",
                    "date": "2024-01-15"
                },
                # Add more testimonials...
            ]
            
            self.wfile.write(json.dumps({
                "success": True,
                "data": testimonials
            }).encode())
            
        elif self.path == '/api/stats':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            
            stats = {
                "total_orders": 750,
                "satisfaction_rate": 98.5,
                "active_clients": 1250,
                "response_time": "5 minutes"
            }
            
            self.wfile.write(json.dumps({
                "success": True,
                "data": stats
            }).encode())
            
        else:
            super().do_GET()
    
    def do_POST(self):
        if self.path == '/api/testimonials':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            testimonial = json.loads(post_data)
            
            # Save testimonial (in real app, save to database)
            testimonial['id'] = datetime.now().timestamp()
            testimonial['date'] = datetime.now().isoformat()
            
            self.send_response(201)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            
            self.wfile.write(json.dumps({
                "success": True,
                "message": "Testimoni berhasil dikirim",
                "data": testimonial
            }).encode())
            
        else:
            self.send_response(404)
            self.end_headers()

if __name__ == '__main__':
    port = 8000
    server = HTTPServer(('localhost', port), CORSRequestHandler)
    
    print(f'🚀 Server JOKIINAJA berjalan di http://localhost:{port}')
    print('Tekan Ctrl+C untuk menghentikan server')
    
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\n👋 Server dihentikan')