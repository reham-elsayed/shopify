#!/bin/bash
# Start the Shopify development server with the required network fixes for Windows
powershell -ExecutionPolicy Bypass -Command "$env:NODE_OPTIONS='--dns-result-order=ipv4first'; $env:NODE_TLS_REJECT_UNAUTHORIZED='0'; shopify theme dev --store frame-theory-qd0hvkgo.myshopify.com"
