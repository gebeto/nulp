#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include <math.h>


struct RandomData {
	int* array;
	int period;
};


void printRandomDataOnDisplay(struct RandomData rand, int size) {
	printf("Period: %d\n\n", rand.period);
	for (int i = 0; i < size; ++i) {
		printf("%d:\t%d\n", i + 1, rand.array[i]);
	}
}

void printRandomDataInFile(struct RandomData rand, int size) {
	FILE * fp;
	fp = fopen("lab1.output.txt", "w");
 
 	fprintf(fp, "Period: %d\n\n", rand.period);
	for (int i = 0; i < size; ++i) {
		fprintf(fp, "%d:\t%d\n", i + 1, rand.array[i]);
	}

	fclose(fp);
}


struct RandomData randomList(int m, int a, int c, int x0) {
	struct RandomData result = { calloc(m-1, sizeof(int)), -1 };
	result.array[0] = x0;
	for (int n = 1; n < m; n++) {
		result.array[n] = (a * result.array[n - 1] + c) % m;
		if (result.array[n] == x0 && result.period < 0) {
			result.period = n;
		}
	}
	return result;
}


int main() {
	const int M = pow(2, 10) - 1;
	const int A = pow(2, 16);
	const int C = 28657;
	const int X0 = 33;

	struct RandomData rand = randomList(M, A, C, X0);

	printRandomDataOnDisplay(rand, M);
	printRandomDataInFile(rand, M);

	// Free memory
	// memset(rand.array, 0, M);

	return 0;
}