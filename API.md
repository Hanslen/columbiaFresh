# API:

## route
/register
## methods=['POST','GET']
## input
{'name':{}, 'email':{}, 'pwd':{})}
## output
1. {"status":"success", "info": token}
2. {"status": "fail", "info":e}

/signin
/confirm/<token>

