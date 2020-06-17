--[[
    luadob by owocean (https://bruhchan.xyz/contact)
]]

dob = {}

local function split (inputstr, sep)
    if sep == nil then
        sep = "%s"
    end
    local t={}
    for str in string.gmatch(inputstr, "([^"..sep.."]+)") do
        table.insert(t, str)
    end
    return t
end

local function slice(tbl, first, last, step)
    local sliced = {}
    for i = first or 1, last or #tbl, step or 1 do
        sliced[#sliced+1] = tbl[i]
    end
    return sliced
end

local function starts(str, test)
    s = string.find(str,test)
    if s == 1 then
        return true
    else
        return false
    end
end

function dob.mount(path)
   dob.path = path
   return path
end

function dob:append(input,info)
    assert(input ~= nil, "No input specified")
    if(info==nil)then
        info = {}
    end
    file = io.open(self.path,"r")
    data = file:read("*a")
    if data == nil then
        data = ""
    end
    file:close()
    infodata = ""
    for i = 1, #info do
        infodata = infodata .. "#! "..info[i].."\n"
    end
    file = io.open(self.path,"w")
    file:write(data.."--- BEGIN POST ---\n"..infodata..input.."\n--- END POST ---\n\n")
    file:close()
end

function dob:stack(input,info)
    assert(input ~= nil, "No input specified")
    if(info==nil)then
        info = {}
    end
    file = io.open(self.path,"r")
    data = file:read("*a")
    if data == nil then
        data = ""
    end
    file:close()
    infodata = ""
    for i = 1, #info do
        infodata = infodata .. "#! "..info[i].."\n"
    end
    file = io.open(self.path,"w")
    file:write("--- BEGIN POST ---\n"..infodata..input.."\n--- END POST ---\n\n"..data)
    file:close()
end

function dob:raw()
    file = io.open(self.path,"r")
    data = file:read("*a")
    if data == nil then
        data = ""
    end
    file:close()
    return data
end

function dob:parse()
    file = io.open(self.path,"r")
    data = file:read("*a")
    if data == nil then
        data = ""
    end
    file:close()
    return parsedob(data)
end

function parsedob(text)
    assert(type(text) == "string", "Expected String")
    lines = split(text, "\n")
    output = {}
    temp = {}
    tempdata = {}
    isPost = false
    for i = 1, #lines do
        if starts(lines[i],"--- BEGIN POST ---") then
            isPost = true
        elseif starts(lines[i],"#!") then
            if not isPost then return end
            d = table.concat(slice(split(lines[i],"#! "),1), "#! ")
            tempdata[#tempdata+1] = d
        elseif starts(lines[i],"--- END POST ---") then
            isPost = false
            d = {
              text = table.concat(temp,"\n"),
              data = tempdata
            }
            output[#output+1] = d
            temp = {}
            tempdata = {}
        else
            if not isPost then return end
            temp[#temp+1] = lines[i]
        end
    end
    return output
end

function dobify(array)
    dob = ""
    assert(type(array) == "table", "Expected Table")
    for i = 1, #array do
        post = array[i]
        assert(post.text ~= nil, "Expected Values")
        if post.text == nil or type(post.text) == "table" then
            post.text = "";
        end
        dob = dob .. "--- BEGIN POST ---\n";
        if post.data ~= nil and type(post.data) == "table" then
            for i = 1, #post.data do
                dob = dob .. "#! " .. post.data[i] .. "\n";
            end
        end
        dob = dob .. post.text .. "\n--- END POST ---\n\n";
    end
    return dob;
end

return dob