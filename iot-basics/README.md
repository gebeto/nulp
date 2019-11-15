# IOT Basics

## Get list of boards
```sh
$ arduino-cli board list
```

### Dictionary
 > ### --fqbn
 > #### Fully Qualified Board Name (FQBN)
 > #### Example:
 > - arduino:avr:uno
 >

 > ### -p
 > #### Port (Port)
 > #### Example:
 > - /dev/cu.usbmodem12345
 >

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
