#include "stm32f4xx.h"
#include "stm32f4xx_exti.h"
#include "misc.h"
#include "stm32f4xx_gpio.h"
#include "stm32f4xx_rcc.h"

#define GREEN GPIO_Pin_12
#define ORANGE GPIO_Pin_13
#define RED GPIO_Pin_14
#define BLUE GPIO_Pin_15

int currIndex = 0;

void InitLEDS(void);
void InitButton(void);
void InitInterrupt(void);

const uint16_t LEDS[4] = {GREEN, ORANGE, RED, BLUE};
uint16_t diod_delay = 1000;
uint16_t delay_c = 0;

void SysTick_Handler(void){
	if(delay_c > 0)
	delay_c--;
}

void delay_ms(uint16_t delay_t){
	delay_c = delay_t;
	while(delay_c){};
}

int main(void) {
	SysTick_Config(SystemCoreClock/1000);
	InitLEDS();
	// InitButton();
	InitInterrupt();
	
	GPIO_SetBits(GPIOD, LEDS[currIndex]);
	while(1) {
		
	};
}

void EXTI0_IRQHandler(void) {
	GPIO_ResetBits(GPIOD, LEDS[currIndex]);
	currIndex++;
	if (currIndex > 3) currIndex = 0; 
	GPIO_SetBits(GPIOD, LEDS[currIndex]);
	
	EXTI_ClearITPendingBit(EXTI_Line0);
}

void InitLEDS(void) {
	GPIO_InitTypeDef gpio_ledInitStruct;
	RCC_AHB1PeriphClockCmd(RCC_AHB1Periph_GPIOD, ENABLE);
	gpio_ledInitStruct.GPIO_Pin = GREEN | ORANGE | RED | BLUE;
	gpio_ledInitStruct.GPIO_Mode = GPIO_Mode_OUT;
	gpio_ledInitStruct.GPIO_OType = GPIO_OType_PP;
	gpio_ledInitStruct.GPIO_Speed = GPIO_Speed_2MHz;
	GPIO_Init(GPIOD, &gpio_ledInitStruct);
}

void InitButton(void) {
	RCC_AHB1PeriphClockCmd(RCC_AHB1Periph_GPIOA, ENABLE);
	GPIO_InitTypeDef gpio_buttonInitStruct;
	gpio_buttonInitStruct.GPIO_Pin = GPIO_Pin_0;
	gpio_buttonInitStruct.GPIO_Mode = GPIO_Mode_IN;
	gpio_buttonInitStruct.GPIO_OType = GPIO_OType_PP;
	gpio_buttonInitStruct.GPIO_Speed = GPIO_Speed_2MHz;
	GPIO_Init(GPIOA, &gpio_buttonInitStruct);
}

void InitInterrupt(void) {
	EXTI_InitTypeDef exti_initStruct;
	NVIC_InitTypeDef nvic_initStruct;

	exti_initStruct.EXTI_Line = EXTI_Line0;
	exti_initStruct.EXTI_Mode = EXTI_Mode_Interrupt;
	exti_initStruct.EXTI_Trigger = EXTI_Trigger_Falling;
	exti_initStruct.EXTI_LineCmd = ENABLE;
	EXTI_Init(&exti_initStruct);

	nvic_initStruct.NVIC_IRQChannel = EXTI0_IRQn;
	nvic_initStruct.NVIC_IRQChannelPreemptionPriority = 1;
	nvic_initStruct.NVIC_IRQChannelPreemptionPriority = 1;
	nvic_initStruct.NVIC_IRQChannelCmd = ENABLE;
	NVIC_Init(&nvic_initStruct);
}

