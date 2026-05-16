#include <math.h>
#include "fractal.h"

typedef struct CartesianLimit
{
    double min;
    double max;
    double dIncr;
} CartesianLimit;

// DEFAULTS
static struct Coord julia_set = {0.35, 0.45};
static struct Color color1 = {255, 0, 0};
static struct Color color2 = {0, 0, 255};
static struct Color BLACK = {0, 255, 0};
static struct Color WHITE = {255, 255, 255};

Color *pixel_buffer = 0;

static int display_w = 800;
static int display_h = 600;

static int max_it = 50;

// cartesian coords
static double cartesian_w = CARTESIAN_W;
static double cartesian_h = 0;
static struct CartesianLimit xLimit = {-3, 3, 0.1};
static struct CartesianLimit yLimit = {-3, 3, 0.1};

int set_max_it(int it)
{
    if (it < 2)
    {
        it = 2;
    }

    if (it >= MAX_ITERATIONS)
    {
        it = MAX_ITERATIONS - 1;
    }

    max_it = it;
    return max_it;
}

void set_imag(double val)
{
    julia_set.imag = val;
}
void set_real(double val)
{
    julia_set.real = val;
}

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
    cartesian_h = cartesian_w * display_h / display_w;
    xLimit.min = -cartesian_w / 2;
    xLimit.max = xLimit.min + cartesian_w;
    xLimit.dIncr = (xLimit.max - xLimit.min) / display_w;

    yLimit.min = -cartesian_h / 2;
    yLimit.max = yLimit.min + cartesian_h;
    yLimit.dIncr = (yLimit.max - yLimit.min) / display_h;
}

void resize_display(int w, int h)
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

    cartesian_h = cartesian_w * display_h / display_w;
    xLimit.dIncr = (xLimit.max - xLimit.min) / display_w;

    double centerX = xLimit.min + ((xLimit.max - xLimit.min) / 2);
    double centerY = yLimit.min + ((yLimit.max - yLimit.min) / 2);
    yLimit.min = centerY - (cartesian_h / 2);
    yLimit.max = yLimit.min + cartesian_h;
    yLimit.dIncr = (yLimit.max - yLimit.min) / display_h;

    Color *temp = realloc(pixel_buffer, display_w * display_h * sizeof(Color));
    if (temp != NULL)
    {
        pixel_buffer = temp;
    }
}

void init_display(int w, int h)
{
    set_size(w, h);
    pixel_buffer = malloc(display_w * display_h * sizeof(Color));
}

void set_color1(unsigned char r, unsigned char g, unsigned char b)
{
    color1.r = r;
    color1.g = g;
    color1.b = b;
}
void set_color2(unsigned char r, unsigned char g, unsigned char b)
{
    color2.r = r;
    color2.g = g;
    color2.b = b;
}

int julia_set_coord_val(Coord c)
{
    double xtmp;
    double zx, zy, zx2, zy2, zx_zy;
    int it = 0;
    zx = c.real;
    zy = c.imag;
    while (it < max_it)
    {
        zx2 = zx * zx;
        zy2 = zy * zy;
        if ((zx2 + zy2) > 4)
        {
            break;
        }
        zy = 2 * zx * zy + julia_set.imag;
        zx = zx2 - zy2 + julia_set.real;

        it++;
    }

    if (it == max_it)
    {
        return it;
    }
    else
    {
        double abs_z = zx * zx + zy * zy;
        return it + 1 - log(log(abs_z)) / log(2);
    }
}

void move(int dir, double delta)
{
    switch (dir)
    {
    case 'l':
        xLimit.min -= delta * cartesian_w;
        xLimit.max = xLimit.min + cartesian_w;
        break;
    case 'r':
        xLimit.min += delta * cartesian_w;
        xLimit.max = xLimit.min + cartesian_w;
        break;
    case 'u':
        yLimit.min += delta * cartesian_h;
        yLimit.max = yLimit.min + cartesian_h;
        break;
    case 'd':
        yLimit.min -= delta * cartesian_h;
        yLimit.max = yLimit.min + cartesian_h;
        break;

    default:
        break;
    }
}

void zoom(double mult)
{
    double centerX = xLimit.min + ((xLimit.max - xLimit.min) / 2);
    double centerY = yLimit.min + ((yLimit.max - yLimit.min) / 2);

    cartesian_w *= mult;
    cartesian_h = cartesian_w * display_h / display_w;
    xLimit.min = centerX - (cartesian_w / 2);
    xLimit.max = xLimit.min + (cartesian_w);
    xLimit.dIncr = (xLimit.max - xLimit.min) / display_w;
    yLimit.min = centerY - (cartesian_h / 2);
    yLimit.max = yLimit.min + cartesian_h;
    yLimit.dIncr = (yLimit.max - yLimit.min) / display_h;
}

void render()
{
    int i, j, val, pixel;
    Coord eval;
    eval.imag = yLimit.max;
    for (i = 0; i < display_h; i++)
    {
        eval.real = xLimit.min;
        for (j = 0; j < display_w; j++)
        {
            val = julia_set_coord_val(eval);
            pixel = j + i * display_w;
            update_colors(pixel, val);
            eval.real = eval.real + xLimit.dIncr;
        }
        eval.imag = eval.imag - yLimit.dIncr;
    }
}

unsigned char lerp_channel(unsigned char start, unsigned char end, double t)
{
    return (unsigned char)(start + (end - start) * t);
}

void update_colors(int idx, int it)
{
    pixel_buffer[idx].a = 255;
    if (max_it <= 0)
    {
        pixel_buffer[idx].r = color1.r;
        pixel_buffer[idx].g = color1.g;
        pixel_buffer[idx].b = color1.b;
        return;
    }

    if (it < 0)
    {
        it = 0;
    }

    if (it > max_it)
    {
        it = max_it;
    }
    double t = (double)it / (double)max_it;

    pixel_buffer[idx].r = lerp_channel(color1.r, color2.r, t);
    pixel_buffer[idx].g = lerp_channel(color1.g, color2.g, t);
    pixel_buffer[idx].b = lerp_channel(color1.b, color2.b, t);
}

void *get_pixel_buffer(void)
{
    return pixel_buffer;
}

int get_width(void)
{
    return display_w;
}
int get_height(void)
{
    return display_h;
}
