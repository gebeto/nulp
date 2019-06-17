## KR 2

[Understand GPIO settings](https://electronics.stackexchange.com/questions/156930/stm32-understanding-gpio-settings)

 - Частота мікроконтроллера = `120 МГц`
 - Частота шини AHB1 = `48 МГц`
 - Максимальна частота слейва = `# * 2` = 5 * 2 = `10`
 - Режим роботи слейва = `(# - 1) % 3` = 4 % 3 = `1`
 - Максимальна кількість слейвів = `# % 4` = 5 % 4 = `1`

```c
GPIO_InitTypeDef GPIO_InitStruct;
SPI_InitTypeDef SPI_InitStruct;
// enable clock for used IO pins
RCC_AHB1PeriphClockCmd(RCC_AHB1Periph_GPIOA, ENABLE);
/* configure pins used by SPI1
* PA5 = SCK
* PA6 = MISO
* PA7 = MOSI
*/
GPIO_InitStruct.GPIO_Pin = GPIO_Pin_7 | GPIO_Pin_6 | GPIO_Pin_5;
GPIO_InitStruct.GPIO_Mode = GPIO_Mode_AF;
GPIO_InitStruct.GPIO_OType = GPIO_OType_PP;
GPIO_InitStruct.GPIO_Speed = GPIO_Speed_50MHz;
GPIO_InitStruct.GPIO_PuPd = GPIO_PuPd_NOPULL;
GPIO_Init(GPIOA, &GPIO_InitStruct);

// connect SPI1 pins to SPI alternate function
GPIO_PinAFConfig(GPIOA, GPIO_PinSource5, GPIO_AF_SPI1);
GPIO_PinAFConfig(GPIOA, GPIO_PinSource6, GPIO_AF_SPI1);
GPIO_PinAFConfig(GPIOA, GPIO_PinSource7, GPIO_AF_SPI1);

// enable clock for used IO pins
RCC_AHB1PeriphClockCmd(RCC_AHB1Periph_GPIOE, ENABLE);
/* Configure the chip select pin
in this case we will use PE7 */
GPIO_InitStruct.GPIO_Pin = GPIO_Pin_7;
GPIO_InitStruct.GPIO_Mode = GPIO_Mode_OUT;
GPIO_InitStruct.GPIO_OType = GPIO_OType_PP;
GPIO_InitStruct.GPIO_Speed = GPIO_Speed_50MHz;
GPIO_InitStruct.GPIO_PuPd = GPIO_PuPd_UP;
GPIO_Init(GPIOE, &GPIO_InitStruct);
GPIOE->BSRRL |= GPIO_Pin_7; // set PE7 high


// enable peripheral clock
RCC_APB2PeriphClockCmd(RCC_APB2Periph_SPI1, ENABLE);
/* configure SPI1 in Mode 0 
* CPOL = 0 --> clock is low when idle
* CPHA = 0 --> data sampled at the first edge
*/
SPI_InitStruct.SPI_Direction = SPI_Direction_2Lines_FullDuplex; // set to full duplex mode, seperate MOSI and MISO lines
SPI_InitStruct.SPI_Mode = SPI_Mode_Master; // transmit in master mode, NSS pin has to be always high
SPI_InitStruct.SPI_DataSize = SPI_DataSize_8b; // one packet of data is 8 bits wide
SPI_InitStruct.SPI_CPOL = SPI_CPOL_Low; // clock is low when idle
SPI_InitStruct.SPI_CPHA = SPI_CPHA_1Edge; // data sampled at first edge
SPI_InitStruct.SPI_NSS = SPI_NSS_Soft | SPI_NSSInternalSoft_Set; // set the NSS management to internal and pull internal NSS high
SPI_InitStruct.SPI_BaudRatePrescaler = SPI_BaudRatePrescaler_4; // SPI frequency is APB2 frequency / 4
SPI_InitStruct.SPI_FirstBit = SPI_FirstBit_MSB;// data is transmitted MSB first
SPI_Init(SPI1, &SPI_InitStruct); 
SPI_Cmd(SPI1, ENABLE); // enable SPI1
```
