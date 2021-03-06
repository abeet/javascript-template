javascript-template
===================

javascript template jstl

Ayada is a "template engine"; a generic tool to generate text output (anything from HTML to autogenerated source code) based on templates. It's a Java package, a class library for Java programmers. It's not an application for end-users in itself, but something that programmers can embed into their products.

@see https://github.com/xuesong123/java-template


Tag Example
===================

c:if

    <c:if test="${1 == 1}">1 == 1</c:if>

out:
    1 == 1

c:forEach & c:each

    <c:forEach items="${1, 2, 3}" var="myvar" varStatus="status">
        ${status.index}: ${myvar}
    </c:forEach>

out:
    0: 1
    1: 2
    2: 3

c:forEach & c:each

    <c:forEach begin="1" end="3" step="1" var="myvar" varStatus="status">
        ${status.index}: ${myvar}
    </c:forEach>

out:
    0: 1
    1: 2
    2: 3

c:forEach & c:each
    var varList = [1, 2, 3];

    <c:forEach items="${varList}" var="myvar" varStatus="status">
        ${status.index}: ${myvar}
    </c:forEach>

out:
    0: 1
    1: 2
    2: 3

c:set

    <c:set var="myvar1" value="${myvar}"/>
    <c:set var="myvar1" value="1,2,3"/>

c:out

    <c:out value="${myvar}" defaultValue="1,2,3" escapeXml="true"/>

out:
    1,2,3

c:choose & c:when & c:otherwise

    <c:choose>
        <c:when test="${userList.length > 6}"><div>test1</div></c:when>
        <c:when test="${userList.length > 7}"><div>test2</div></c:when>
        <c:otherwise><div>test3</div></c:otherwise>
    </c:choose>

c:comment

    <c:comment>
        ...
    </c:comment>

fmt:formatDate

    <fmt:formatDate var="mydate1" value="${mydate}" pattern="yyyy-MM-dd"/>

t:import

    <t:import name="app:cache" className="com.mytest.taglib.CacheTag"/>

import a tag, scope: current page

t:include

<t:include file="/include/mytest.jsp"/>

include a page

API Example
===================

    // scope: global
    com.skin.ayada.jstl.TagLibraryFactory.setup("app:scrollpage", com.mytest.taglib.ScrollPageTag);

     * @param home - work directory
     * @param expire
    var templateContext = new com.skin.ayada.template.TemplateContext("/", 300);

    var writer = var writer = new com.skin.io.StringWriter();
    var context = {userList: [{userName: "test", userAge: 20}]};
    templateContext.execute("source1", context, writer);
    alert(writer.toString());
