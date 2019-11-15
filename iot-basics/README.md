# IOT Basics


## Get list of boards
```sh
$ arduino-cli board list

FQBN               Port                     ID           Board Name
arduino:avr:uno    /dev/cu.usbmodem12345    2341:0043    Arduino/Genuina Uno

```

## Install dependencies
```sh
$ arduino-cli core install arduino:avr
```


## Board List to parameters mapping
 - `--fqbn` - Fully Qualified Board Name (FQBN)
 - `-p` - Port (Port)


## Create project
```sh
$ arduino-cli sketch new <project-name>
```


## Compile project
```sh
$ arduino-cli compile --fqbn <FBQN> $(pwd)
```


## Upload compiled project to arduino
```sh
$ arduino-cli upload -p <Port> --fqbn <FBQN> $(pwd)
```
