

FILE *fptr = fopen(argv[1], "r");
fseek(fptr, 0L, SEEK_END);
int sz = ftell(fptr);
fseek(fptr, 0L, SEEK_SET);
fclose(fptr);

printf("%d\n", sz);