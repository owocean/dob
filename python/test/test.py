from dobpy import dob

database = dob.mount("./test.dob")

database.append("Hello World!",[])
database.stack("This post has data values", ["dob","is","cool"])

print(database.raw())
print(database.parse())

# or

print(
    dob.parsedob(
        database.raw()
    )
)
print(
    dob.dobify(
        database.parse()
    )
)