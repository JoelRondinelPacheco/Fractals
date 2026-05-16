#ifndef FRACTAL_H
#define FRACTAL_H

#include <stddef.h>
#include <stdlib.h>

#define MAX_PALETTE_SIZE 500
#define MAX_ITERATIONS 1000000
#define CARTESIAN_W 6
#define ZOOM_MULTIPLIER 0.9
typedef struct Color
{
    unsigned char r;
    unsigned char g;
    unsigned char b;
    unsigned char a;
} Color;
typedef struct Coord
{
    double real;
    double imag;
} Coord;

int set_max_it(int it);
void set_imag(double val);
void set_real(double val);

void set_color1(unsigned char r, unsigned char g, unsigned char b);
void set_color2(unsigned char r, unsigned char g, unsigned char b);

void init_display(int w, int h);
void resize_display(int w, int h);
void render();
void *get_pixel_buffer(void);
void update_colors(int idx, int w);

int get_width(void);
int get_height(void);

// api
void zoom(double mult);
void move(int dir, double delta);

#endif