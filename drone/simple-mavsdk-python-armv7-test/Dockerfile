FROM gitlab.ilabt.imec.be:4567/jfmoeyer/mp2020ug-one/mavsdk-python-armv7:latest

WORKDIR /usr/src/test

ADD examples /usr/src/test

CMD [ "python", "./telemetry.py" ]

# built the image using: docker image build -t gitlab.ilabt.imec.be:4567/jfmoeyer/mp2020ug-one/simple-mavsdk-python-armv7-test:latest .
# run the image using: docker run --rm -it -p 127.0.0.1:14550:14540/udp gitlab.ilabt.imec.be:4567/jfmoeyer/mp2020ug-one/simple-mavsdk-python-armv7-test
