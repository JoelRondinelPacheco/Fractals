#ifndef FRACTAL_H
#define FRACTAL_H

#define MAX_WIDTH 5000
#define MAX_HEIGHT 5000

#define PIXEL_BUFFER_SIZE (MAX_WIDTH * MAX_HEIGHT)

#define MAX_PALETTE_SIZE 1000
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

// PLATFORM

// config
void set_max_it(int it);
void set_size(int width, int height);
void set_color1(unsigned char r, unsigned char g, unsigned char b);
void set_color2(unsigned char r, unsigned char g, unsigned char b);

// calc
void build_palette(void);
void calc_pixel_buffer();
void *get_pixel_buffer(void);
void *get_color_buffer(void);
// defs?
int julia_set_coord_w(Coord c);
void set_buffer(int idx, int w);

int get_palette_color_r(int idx);
int get_palette_color_g(int idx);
int get_palette_color_b(int idx);

int get_max_it(void);

int add(int a, int b);
int get_width(void);
int get_height(void);

#endif