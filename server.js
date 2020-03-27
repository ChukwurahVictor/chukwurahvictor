const http = require('http')
const fs = require('fs')
const { parse } = require('querystring')

//create server
const server = http.createServer((req, res) => {
    //Handle post method
    if (req.method === 'POST') {
        let body = ''
        req.on('data', chunk => {
            body += chunk.toString()
            parse(body)
        })
        req.on('end', () => {
            //console.log(
            //    parse(body)
            //write to text file
            fs.writeFile('message.txt', body, function(err) {
                if (err) {
                    throw err
                }
            })
            res.end('ok')
        })
    } else {
        //setup html form
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write('<form action="/message" method="post">')
        res.write('<label for="message"> Enter a message:<br>')
        res.write('<input type= "text" name="/message"><br>')
        res.write('<input type="submit" value= "submit">')
        res.write('</form>')
    }
}).listen(8080, console.log('Server running on port 8080')) //port listener
