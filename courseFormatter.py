input_string = "M010, M113, M114, M115, M205, M210, M217, M221, M230, M231, M232, M241, M242, M243, M245, M251, M302, M342, M349, M350, M351, M352, M380, M426, M450, M451, M460, M503, M508, M512, M518, M529, M540, M600, M612, M616, M630, M637, M672, M688"

courses = input_string.split(", ")
formatted_courses = []

for course in courses:
    course_code = course.strip()
    course_name = " ".join([course_code[:1] + "ATH", course_code[1:]])
    formatted_courses.append(f'{{ "name": "{course_name}", "color": "03A9F4" }}')

formatted_output = ",\n".join(formatted_courses)

print(formatted_output)