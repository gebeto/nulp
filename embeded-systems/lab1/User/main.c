#include "main.h"
#include "stm32f4xx_rcc.h"
#include "stm32f4xx_gpio.h"
#include "stdio.h"
#define  STM32F40_41xxx
/**///////////////////////////////////////////////////////////////////////////////////////////////////**/
uint16_t delay_c = 0; 
/**///////////////////////////////////////////////////////////////////////////////////////////////////**/
/**//////////////////////////SYSTICK//////////////////////////////////////////////////////////////////**/
/**///////////////////////////////////////////////////////////////////////////////////////////////////**/
void SysTick_Handler(void){
	if(delay_c > 0)
		delay_c--;
}
/**///////////////////////////////////////////////////////////////////////////////////////////////////**/
/**//////////////////////////DELAY ms/////////////////////////////////////////////////////////////////**/
/**///////////////////////////////////////////////////////////////////////////////////////////////////**/
void Delay_ms(uint16_t delay_t)
{
	delay_c = delay_t;
	while(delay_c){};
}


/**///////////////////////////////////////////////////////////////////////////////////////////////////**/
/**//////////////////////////INIT port.../////////////////////////////////////////////////////////////**/
/**///////////////////////////////////////////////////////////////////////////////////////////////////**/
int main(void)
{
	char ScrStr[20];
	GPIO_InitTypeDef 	GPIO_Init_LED;
	
	
	SysTick_Config(SystemCoreClock/1000);
	
	RCC_AHB1PeriphClockCmd(RCC_AHB1Periph_GPIOD, ENABLE);
	
	GPIO_Init_LED.GPIO_Pin = GPIO_Pin_12|GPIO_Pin_13|GPIO_Pin_14|GPIO_Pin_15;
	GPIO_Init_LED.GPIO_Mode = GPIO_Mode_OUT;
	GPIO_Init_LED.GPIO_Speed = GPIO_Speed_50MHz;
	GPIO_Init_LED.GPIO_OType = GPIO_OType_PP;
	GPIO_Init_LED.GPIO_PuPd = GPIO_PuPd_NOPULL;
	GPIO_Init(GPIOD, &GPIO_Init_LED);
	
	
	uint16_t delay = 500; 

  while(1)
	{
		GPIO_SetBits(GPIOD, GPIO_Pin_14 | GPIO_Pin_13);
		Delay_ms(delay);
		GPIO_ResetBits(GPIOD, GPIO_Pin_14 | GPIO_Pin_13);
		Delay_ms(delay);
		delay += 500;
	}
}





//#include <stm32f4xx.h> 

//uint16_t delay_c = 0; 
//void SysTick_Handler(void){
//	if(delay_c > 0)
//		delay_c--;
//}
//void delay_ms(uint16_t delay_t){
//	delay_c = delay_t;
//	while(delay_c){};
//}
//int main (void){
//  SysTick_Config(SystemCoreClock/1000);
//	RCC->AHB1ENR |= RCC_AHB1ENR_GPIODEN;
//	GPIOD->MODER	= 0x55000000;
//	GPIOD->OTYPER = 0;
//	GPIOD->OSPEEDR = 0;	
//	while(1){
//   	GPIOD->ODR = 0x9000;
//		delay_ms(500);
//		GPIOD->ODR = 0x0000;	
//		delay_ms(500);
//	}
//}
