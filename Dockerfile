FROM nginx:alpine

# 빌드된 파일들을 Nginx의 웹 루트로 복사
COPY build/ /usr/share/nginx/html

# Nginx 설정 파일 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]