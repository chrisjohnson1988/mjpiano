<#assign navigation=json.readFile("navigation.json")>

<ul id="navigation">
	<#list navigation as x>
		<#if x.href == href>
			<li class="selected ${x.css}">
				<span class="selected-image">${x.navTitle}</span>
			</li>
		<#else>
			<li class="${x.css}"><a href="${x.href}">
				<span class="image">${x.navTitle}</span>
				<span class="hover"></span>
			</a></li>
		</#if>
	</#list>
</ul>