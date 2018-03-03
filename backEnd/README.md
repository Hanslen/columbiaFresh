# Requirements
database: MySQL

# Usage
init database (currently only Customer table):
```
python3 manage.py init_db
```

test the server-side functions:
```
workon backEnd
pip install -r requirements.txt
python3 manage.py server
```
# Problem waiting to solve
1. Token received is not match.
2. Response with status code. Need to test.
3. Wrapper function for login verification.
