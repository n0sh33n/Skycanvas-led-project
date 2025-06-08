{\rtf1\ansi\ansicpg1252\cocoartf2580
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\froman\fcharset0 Times-Roman;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww31360\viewh19740\viewkind0
\deftab720
\pard\pardeftab720\pardirnatural\partightenfactor0

\f0\fs24 \cf0 function takeSnapshot() \{\
  const link = document.createElement('a');\
  link.download = 'skycanvas_snapshot.png';\
  link.href = renderer.domElement.toDataURL('image/png');\
  link.click();\
\}}