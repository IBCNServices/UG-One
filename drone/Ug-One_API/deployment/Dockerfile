FROM python:3.8

# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE 1

# Turns off buffering for easier container logging
ENV PYTHONUNBUFFERED 1

WORKDIR /Ug-One_API/Ug-One_API/

# Install dependencies 
RUN apt-get update && \
    # usbutils to read out usb devices, does not work at this time
    apt-get install usbutils -y

#install Python dependencies
COPY Ug-One_API/requirements.txt /Ug-One_API/Ug-One_API/requirements.txt
RUN pip3 install --no-cache-dir --trusted-host pypi.python.org -r requirements.txt

COPY Ug-One_API/ /Ug-One_API/Ug-One_API

EXPOSE 14500

CMD ["gunicorn", "--timeout", "300", "--threads", "3", "--bind", "[::]:14500", "--worker-tmp-dir", "/dev/shm", "wsgi:app"]
