<script lang="ts" setup>
import { METADATA } from '~/store/constants'
</script>

<template>
  <Head>
    <!-- <meta name="twitter:card" content="summary_large_image"> -->
    <Meta httpequiv="Content-Type" content="text/html; charset=utf-8" />
    <Meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <Meta httpequiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <Meta name="description" :content="METADATA.description" />
    <Meta property="og:locale" content="en_US" />
    <Meta property="og:type" content="website" />
    <Meta property="og:title" :content="METADATA.title" />
    <Meta property="og:description" :content="METADATA.description" />
    <Meta property="og:url" :content="METADATA.siteUrl" />
    <Meta property="og:site_name" :content="METADATA.title" />
    <Meta property="og:image" content="https://www.ayushsingh.net/preview.jpg" />
    <Meta property="og:image:secure_url" :content="METADATA.siteUrl" />
    <Meta property="og:image:width" content="1440" />
    <Meta property="og:image:height" content="800" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
  </Head>
</template>
