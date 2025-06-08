{\rtf1\ansi\ansicpg1252\cocoartf2580
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\froman\fcharset0 Times-Roman;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww31360\viewh19740\viewkind0
\deftab720
\pard\pardeftab720\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // Optional animated text canvas generator\
function createTextCanvasTexture(text = "Welcome to SkyCanvas") \{\
  const canvas = document.createElement('canvas');\
  canvas.width = 512;\
  canvas.height = 128;\
  const ctx = canvas.getContext('2d');\
  ctx.fillStyle = '#000';\
  ctx.fillRect(0, 0, canvas.width, canvas.height);\
  ctx.font = '32px sans-serif';\
  ctx.fillStyle = '#fff';\
  ctx.fillText(text, 20, 80);\
  return new THREE.CanvasTexture(canvas);\
\}\
}