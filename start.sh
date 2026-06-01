#!/bin/bash

export NODE_OPTIONS="--dns-result-order=ipv4first"
export NODE_TLS_REJECT_UNAUTHORIZED=0
export NODE_TIMEOUT=120000
shopify theme dev --store frame-theory-qd0hvkgo.myshopify.com --verbose