#include "fractal.h"

static int canvas_width = 0;
static int canvas_height = 0;
static int max_it = 50;
// cfg
void set_max_it(int it)
{
    max_it = it;
}
int get_max_it(void)
{
    return max_it;
}

int add(int a, int b)
{
    return a + b;
}

void set_size(int widht, int height)
{
    canvas_width = widht;
    canvas_height = height;
}

int get_width(void)
{
    return canvas_width;
}
int get_height(void)
{
    return canvas_height;
}