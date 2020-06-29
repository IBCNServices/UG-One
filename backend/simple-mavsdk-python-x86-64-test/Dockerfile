FROM python:3.8

# Set the working directory, this is the image file system
WORKDIR /usr/src/app

ADD telemetry.py /usr/src/app

RUN pip install mavsdk

CMD [ "python", "./telemetry.py" ]

# build the image using: docker image build -t gitlab.ilabt.imec.be:4567/jfmoeyer/mp2020ug-one/simple-mavsdk-python-x86-64-test:<tag> .
# run the image using: docker run --rm -it -p 10.2.0.184:14550:14550/udp gitlab.ilabt.imec.be:4567/jfmoeyer/mp2020ug-one/simple-mavsdk-python-x86-64-test:<tag>
# 10.2.0.184 is the ip of the host in this example, running the container should print out telemetry data.
