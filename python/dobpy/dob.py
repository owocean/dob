class mount:
    def __init__(self, path):
        if (path==None) or (type(path) != str):
            raise Exception('No path specified')
        self.path = path
    def append(self,input,info):
        if input == None:
            raise Exception('No input specified')
        if info == None:
            info = []
        file = open(self.path,"r")
        data = file.read()
        file.close()
        infodata = ""
        for infoiteration in info:
            infodata += "#! "+infoiteration+"\n"
        file = open(self.path,"w")
        file.write(data+"--- BEGIN POST ---\n"+infodata+input+"\n--- END POST ---\n\n")
        file.close()
    def stack(self,input,info):
        if input == None:
            raise Exception('No input specified')
        if info == None:
            info = []
        file = open(self.path,"r")
        data = file.read()
        file.close()
        infodata = ""
        for infoiteration in info:
            infodata += "#! "+infoiteration+"\n"
        file = open(self.path,"w")
        file.write("--- BEGIN POST ---\n"+infodata+input+"\n--- END POST ---\n\n"+data)
        file.close()
    def raw(self):
        file = open(self.path,"r")
        data = file.read()
        file.close()
        return data
    def parse(self):
        file = open(self.path,"r")
        data = file.read()
        file.close()
        return parsedob(data)

def parsedob(dob):
    if(type(dob) != str):
        raise Exception('Expected string')
    lines = dob.split("\n")
    output = []
    temp = []
    tempdata = []
    isPost = False
    for line in lines:
        if(line.startswith("--- BEGIN POST ---")):
            isPost = True
        elif(line.startswith("#!")):
            if(isPost == True):
                d = "#! ".join(line.split("#! ")[1:])
                tempdata.append(d)
        elif(line.startswith("--- END POST ---")):
            isPost = False
            d = {
                "text":"\n".join(temp),
                "data":tempdata
            }
            output.append(d)
            temp = []
            tempdata = []
        else:
            if(isPost == True):
                temp.append(line)
    return output

def dobify(array):
    dob = ""
    if(isinstance(array,list)!=True):
        raise Exception('Expected array')
    for post in array:
        if(post["text"] == None):
            raise Exception('Expected values')
        if(type(post["text"]) == object):
            post["text"] = ""
        dob += "--- BEGIN POST ---\n"
        if(post["data"] != None and isinstance(post["data"],list)):
            for data in post["data"]:
                dob += "#! " + data + "\n"
        dob += post["text"] + "\n--- END POST ---\n\n"
    return dob