#!/usr/bin/env python
import sys
import os
import socket

# Add current directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

def find_available_port(start_port=8000, end_port=8010):
    """Find an available port"""
    for port in range(start_port, end_port):
        try:
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            sock.bind(('127.0.0.1', port))
            sock.close()
            return port
        except OSError:
            continue
    return start_port

if __name__ == "__main__":
    import uvicorn
    # Use port 8001 explicitly for the backend API
    port = 8001
    print(f"Using port: {port}")
    uvicorn.run(
        "app.main:app",
        host="127.0.0.1",
        port=port,
        reload=False
    )
