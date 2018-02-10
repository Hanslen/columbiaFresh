import random
import psycopg2


def generate_passoword():
    result = ""
    result += chr(random.randint(65, 90))   #one upper letter
    for i in range(3):
        result += chr(random.randint(97, 122))   #three lower letters
    result += str(random.randint(100000000, 999999999))   #ten numbers
    return ''.join(sorted([s for s in result], key=lambda k: random.random()))

def generate_tel():
    return random.randint(100000000, 999999999)

def generateUserSupplier(cur, connect):
    
    create_command1 = "create table guest(guest_id int not NULL CONSTRAINT guest_id_length CHECK(guest_id>1000000000)," \
            "password varchar(30) not null constraint guest_password_length check(length(password)>10)," \
                "name varchar(45) not null," \
                    "gender varchar(20) not null constraint guest_gender_check check(gender = 'Male' or gender = 'Female')," \
                        "Email varchar(45) not null," \
                            "tel int not null constraint guest_tel_length check(tel<999999999 and tel>100000000)," \
                                "primary key(guest_id));"

    cur.execute(create_command1)
    cur.execute("Insert into guest values(1000000001, '%s', 'WangYi', 'Male', 'WangYi@gmail.com', %s)" % (generate_passoword(), generate_tel()))
    cur.execute("Insert into guest values(1000000002, '%s','ZhangEr', 'Female', 'ZhangEr@gmail.com', %s)" % (generate_passoword(), generate_tel()))
    cur.execute("Insert into guest values(1000000003, '%s', 'LiSan', 'Male', 'LiSan@gmail.com', %s)" % (generate_passoword(), generate_tel()))
    cur.execute("Insert into guest values(1000000004, '%s', 'ZhaoSi', 'Male', 'ZhaoSi@gmail.com', %s)" % (generate_passoword(), generate_tel()))
    cur.execute("Insert into guest values(1000000005, '%s',\'ChenWu\', 'Female', 'ChenWu@gmail.com', %s)" % (generate_passoword(), generate_tel()))
    cur.execute("Insert into guest values(1000000006, '%s',\'ZhouLiu\','Male', 'ZhouLiu@gmail.com', %s)" % (generate_passoword(), generate_tel()))
    cur.execute("Insert into guest values(1000000007, '%s',\'DengQi\', 'Male', 'DengQi@gmail.com', %s)" % (generate_passoword(), generate_tel()))
    cur.execute("Insert into guest values(1000000008, '%s',\'YuBa\', 'Male', 'YuBa@gmail.com', %s)" % (generate_passoword(), generate_tel()))
    cur.execute("Insert into guest values(1000000009, '%s',\'SunJiu\', 'Female', 'SunJiu@gmail.com', %s)" % (generate_passoword(), generate_tel()))
    cur.execute("Insert into guest values(1000000010, '%s',\'ZhengShi\','Male', 'ZhengShi@gmail.com', %s)" % (generate_passoword(), generate_tel()))

    connect.commit()
    print "table guest created."

    create_command2 = "create table supplier(supplier_id int not NULL CONSTRAINT supplier_id_length CHECK(supplier_id>1000000000)," \
                     "password varchar(30) not null constraint supplier_password_length check(length(password)>10)," \
                     "name varchar(45) not null," \
                     "gender varchar(20) not null constraint supplier_gender_check check(gender = 'Male' or gender = 'Female')," \
                     "Email varchar(45) not null," \
                     "tel int not null constraint supplier_tel_length check(tel<999999999 and tel>100000000)," \
                     "primary key(supplier_id));"

    cur.execute(create_command2)

    cur.execute("Insert into supplier values(1000000001, '%s', 'Sam', 'Male', 'Same@gmail.com', %s)" % (
    generate_passoword(), generate_tel()))
    cur.execute("Insert into supplier values(1000000002, '%s','Alice', 'Female', 'Alice@gmail.com', %s)" % (
    generate_passoword(), generate_tel()))
    cur.execute("Insert into supplier values(1000000003, '%s', 'Blei', 'Male', 'Blei@gmail.com', %s)" % (
    generate_passoword(), generate_tel()))
    cur.execute("Insert into supplier values(1000000004, '%s', 'Verma', 'Male', 'Verma@gmail.com', %s)" % (
    generate_passoword(), generate_tel()))
    cur.execute("Insert into supplier values(1000000005, '%s','Kathleen', 'Female', 'Kathleen@gmail.com', %s)" % (
    generate_passoword(), generate_tel()))
    cur.execute("Insert into supplier values(1000000006, '%s','Clifford','Male', 'Clifford@gmail.com', %s)" % (
    generate_passoword(), generate_tel()))
    cur.execute("Insert into supplier values(1000000007, '%s','James', 'Male', 'James@gmail.com', %s)" % (
    generate_passoword(), generate_tel()))
    cur.execute("Insert into supplier values(1000000008, '%s','Alex', 'Male', 'Alex@gmail.com', %s)" % (
    generate_passoword(), generate_tel()))
    cur.execute("Insert into supplier values(1000000009, '%s','Julia', 'Female', 'Juia@gmail.com', %s)" % (
    generate_passoword(), generate_tel()))
    cur.execute("Insert into supplier values(1000000010, '%s','Collins','Male', 'Collins@gmail.com', %s)" % (
    generate_passoword(), generate_tel()))

    connect.commit()
    print "table supplier created."

    connect.close()
