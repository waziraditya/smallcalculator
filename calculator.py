from cmath import sqrt

from flask import Flask, render_template, request


app = Flask(__name__, template_folder=".", static_folder=".")


def format_number(value):
    if abs(value) < 1e-10:
        value = 0

    if isinstance(value, float) and value.is_integer():
        return str(int(value))

    return f"{value:.4g}"


def format_root(root):
    real = root.real
    imaginary = root.imag

    if abs(imaginary) < 1e-10:
        return format_number(real)

    sign = "+" if imaginary >= 0 else "-"
    return f"{format_number(real)} {sign} {format_number(abs(imaginary))}i"


def find_quadratic_zeros(a, b, c):
    if a == 0:
        return "a cannot be 0 for a quadratic equation."

    discriminant = b**2 - 4 * a * c
    first_zero = (-b + sqrt(discriminant)) / (2 * a)
    second_zero = (-b - sqrt(discriminant)) / (2 * a)

    return f"x = {format_root(first_zero)} and x = {format_root(second_zero)}"


@app.route("/")
def home():
    return render_template(
        "homepage.html",
        result="Your zeros will appear here after calculation.",
        values={"a": "", "b": "", "c": ""},
    )


@app.route("/calculate", methods=["POST"])
def calculate():
    values = {
        "a": request.form.get("a", ""),
        "b": request.form.get("b", ""),
        "c": request.form.get("c", ""),
    }

    try:
        a = float(values["a"])
        b = float(values["b"])
        c = float(values["c"])
        result = find_quadratic_zeros(a, b, c)
    except ValueError:
        result = "Please enter valid numbers for a, b, and c."

    return render_template("homepage.html", result=result, values=values)


if __name__ == "__main__":
    app.run(debug=True)
