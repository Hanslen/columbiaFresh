from app import app
from ..auth import check_token

@app.route('/getfavouritelist', methods=['POST'])
@check_token
def GetFavoriteList():
    pass
