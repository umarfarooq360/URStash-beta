#Connect
mongo proximus.modulusmongo.net:27017/Owoven3i -u admin -p passw0rd

#Update a field
db.books.findAndModify({query:{_id: value}, update: {$set: {"Sold":false} }});