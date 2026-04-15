#include "fractal.h"

typedef struct CordLimit
{
    double min;
    double max;
    double dIncr;
} CordLimit;

// DEFAULTS
static struct Coord julia_set = {0.35, 0.45};
static struct Color color1 = {255, 0, 0};
static struct Color color2 = {0, 0, 255};
static struct Color palette[MAX_PALETTE_SIZE];
static struct Color pixel_buffer[MAX_WIDTH * MAX_HEIGHT];

static int display_w = 800;
static int display_h = 600;

static int max_it = 50;

// cartesian coords
static double coord_w = 6; // change on zooms
static double coord_h = 0;

static struct CordLimit xLimit = {-3, 3, 0.1};
static struct CordLimit yLimit = {-3, 3, 0.1};
static double dx = 0;
static double dy = 0;

// todo on set width
void set_size(int w, int h)
{
    if (w < 1)
    {
        w = 800;
    }
    if (h < 1)
    {
        h = 600;
    }

    display_w = w;
    display_h = h;

    coord_h = coord_w * display_h / display_w;
    // todo mov
    xLimit.min = -coord_w / 2;
    // xLimit.max = coord_w / 2;
    xLimit.max = xLimit.min + coord_w;
    xLimit.dIncr = (xLimit.max - xLimit.min) / display_w;

    yLimit.min = -coord_h / 2;
    // yLimit.max = coord_h / 2;
    yLimit.max = yLimit.min + coord_h;
    yLimit.dIncr = (yLimit.max - yLimit.min) / display_h;
}
// on zoom cfg structs, h
// on move cfg structs, h

void calc_pixel_buffer()
{
    int i, j, w, pixel;
    Coord eval;
    // y = yLimit.min;
    eval.imag = yLimit.min;
    for (i = 0; i < display_h; i++)
    {
        // x = xLimit.min;
        eval.real = xLimit.min;
        for (j = 0; j < display_w; j++)
        {
            w = julia_set_coord_w(eval);
            pixel = j + i * display_w;

            set_buffer(pixel, w);
            eval.real = eval.real + xLimit.dIncr;
        }
        eval.imag = eval.imag + yLimit.dIncr;
    }
}
void set_buffer(int idx, int w)
{
    pixel_buffer[idx].r = palette[w].r;
    pixel_buffer[idx].g = palette[w].g;
    pixel_buffer[idx].b = palette[w].b;
    // pixel_buffer[idx].r = 0;
    // pixel_buffer[idx].g = 255;
    // pixel_buffer[idx].b = 0;
    pixel_buffer[idx].a = 255;
}

void *get_pixel_buffer(void)
{
    return pixel_buffer;
}
void *get_color_buffer(void)
{
    return palette;
}
int julia_set_coord_w(Coord c)
{
    double a, aa, b, bb, a_b;
    a = c.real;
    b = c.imag;
    int w = 0;
    // a, b, n -> a =x; b = y
    while (w < max_it)
    {
        aa = a * a;
        bb = b * b;
        if ((aa + bb) > 10000) // se pinta todo negro
        {
            break;
        }
        a_b = 2 * a * b;
        a = aa - bb + julia_set.real;
        b = a_b + julia_set.imag;
        w++;
    }
    return w;
}

// cfg
void set_color1(unsigned char r, unsigned char g, unsigned char b)
{
    color1.r = r;
    color1.b = b;
    color1.g = g;
}
void set_color2(unsigned char r, unsigned char g, unsigned char b)
{
    color2.r = r;
    color2.b = b;
    color2.g = g;
}

void build_palette(void)
{
    double t;
    int i, r, g, b;

    for (i = 0; i < max_it; i++)
    {
        t = (double)i / (double)(max_it - 1);

        r = (int)((1.0 - t) * color1.r + t * color2.r);
        g = (int)((1.0 - t) * color1.g + t * color2.g);
        b = (int)((1.0 - t) * color1.b + t * color2.b);

        palette[i].r = (unsigned char)r;
        palette[i].g = (unsigned char)g;
        palette[i].b = (unsigned char)b;
    }
}

int get_palette_color_r(int idx)
{
    struct Color empty = {0, 0, 0};

    if (idx < 0 || idx >= MAX_PALETTE_SIZE)
    {
        return empty.r;
    }

    return palette[idx].r;
}

int get_palette_color_g(int idx)
{
    struct Color empty = {0, 0, 0};

    if (idx < 0 || idx >= MAX_PALETTE_SIZE)
    {
        return empty.g;
    }

    return palette[idx].g;
}
int get_palette_color_b(int idx)
{
    struct Color empty = {0, 0, 0};

    if (idx < 0 || idx >= MAX_PALETTE_SIZE)
    {
        return empty.b;
    }

    return palette[idx].b;
}

void set_max_it(int it)
{
    if (it < 2)
    {
        it = 2;
    }

    if (it >= MAX_PALETTE_SIZE)
    {
        it = MAX_PALETTE_SIZE - 1;
    }

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

int get_width(void)
{
    return display_w;
}
int get_height(void)
{
    return display_h;
}