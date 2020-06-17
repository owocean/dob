require("dob")
-- "dob.lua" should be placed in the same working directory as the files requiring it,
-- or in a folder in the working directory

-- mount to target file
dob.mount("./test.dob")

dob:append("Hello World!",{})
dob:stack("This post has data values", {"dob","is","cool"})

-- print contents of file as string
print(dob:raw())
-- print contents of file as table
print(dob:parse())

-- or

print(
    -- parse the string into a table
    parsedob(
        dob:raw()
    )
)
print(
    -- parse the table into a string
    dobify(
        dob:parse()
    )
)