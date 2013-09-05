var http = require("http");
var july = require("../../webserver.js");

/**
 * disable *.jsp
 */
july.JspServlet.prototype.execute = function(request, response, servletChain){
    response.writeHead(404, "NotFound", {"Content-type": "text/html"});
    response.end("<h1 error=\"10004\">Request URL '" + request.requestURI + "' not found !</h1>");
};

var webServer = new july.WebServer();
var vistualHost = new july.VistualHost("localhost|127\\.0\\.0\\.1");
var app1 = july.WebApplicationFactory.create("localhost", "app1", "/app1");
var app2 = july.WebApplicationFactory.create("localhost", "app2", "/app2");
var admin = july.WebApplicationFactory.create("localhost", "admin", "/admin");

webServer.add(vistualHost);
vistualHost.add(app1);
vistualHost.add(app2);
vistualHost.add(admin);

var servletContextList = [];

for(var i = 0; i < vistualHost.applications.length; i++)
{
    servletContextList.push(vistualHost.applications[i].getServletContext());
}

/**
 * scan & lod ${HOME}/WEB-INF/lib/*.js
 */
admin.servletContext.getServletContextList = function(){
    return servletContextList;
};

admin.servletContext.admin = true;
admin.servletContext.load();
app1.servletContext.load();
app2.servletContext.load();

var server = (function(){
    return http.createServer(function(request, response){
        if(request.url == "/favicon.ico")
        {
            response.writeHead(404, "Not Found", {"Content-Type": "text/plain"});
            response.end();
            return;
        }
        webServer.dispatch(request, response);
    });
})();

server.listen(80, "localhost");
console.log("server start on port: 80");