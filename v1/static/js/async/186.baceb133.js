(self.webpackChunk=self.webpackChunk||[]).push([["186"],{1049:function(s,a,n){"use strict";n.r(a);var t=n("7059");let l=["innerHTML"];a.default={setup:()=>({html:""}),render:()=>((0,t.wg)(),(0,t.iD)("div",{class:"van-doc-markdown-body",innerHTML:'<h1>Steps \u6B65\u9AA4\u6761</h1>\n<div class="van-doc-card"><h3 id="jie-shao" tabindex="-1">\u4ECB\u7ECD</h3>\n<p>\u6B65\u9AA4\u6761\u5E38\u7528\u4E8E\u8868\u5355\u5206\u6B65\u5B8C\u6210\u65F6\u4F7F\u7528\uFF0C\u63D0\u4F9B\u6A2A\u5411\u548C\u7EB5\u5411\u4E24\u79CD\u5E03\u5C40\u65B9\u5F0F\u3002</p>\n</div><div class="van-doc-card"><h3 id="yin-ru" tabindex="-1">\u5F15\u5165</h3>\n<p>\u901A\u8FC7\u4EE5\u4E0B\u65B9\u5F0F\u6765\u5168\u5C40\u6CE8\u518C\u7EC4\u4EF6\uFF0C\u66F4\u591A\u6CE8\u518C\u65B9\u5F0F\u8BF7\u53C2\u8003<a href="#/zh-CN/advanced-usage#zu-jian-zhu-ce" target="_blank">\u7EC4\u4EF6\u6CE8\u518C</a>\u3002</p>\n<pre><code class="language-js"><span class="hljs-keyword">import</span> { createApp } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vue&#x27;</span>;\n<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Setps</span>, <span class="hljs-title class_">SetpsItem</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vant-common&#x27;</span>;\n\n<span class="hljs-keyword">const</span> app = <span class="hljs-title function_">createApp</span>();\napp.<span class="hljs-title function_">use</span>(<span class="hljs-title class_">Setps</span>);\napp.<span class="hljs-title function_">use</span>(<span class="hljs-title class_">SetpsItem</span>);\n</code></pre>\n</div><h2 id="dai-ma-yan-shi" tabindex="-1">\u4EE3\u7801\u6F14\u793A</h2>\n<div class="van-doc-card"><h3 id="ji-chu-yong-fa" tabindex="-1">\u57FA\u7840\u7528\u6CD5</h3>\n<p><code>active</code> \u5C5E\u6027\u8868\u793A\u5F53\u524D\u6B65\u9AA4\u7684\u7D22\u5F15\uFF0C\u4ECE 0 \u8D77\u8BA1\u3002</p>\n<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">m-setps</span> <span class="hljs-attr">:active</span>=<span class="hljs-string">&quot;active&quot;</span>&gt;</span>\n  <span class="hljs-tag">&lt;<span class="hljs-name">m-setps-item</span> <span class="hljs-attr">title</span>=<span class="hljs-string">&quot;\u4E0A\u4F20\u6210\u7EE9\u5355&quot;</span> /&gt;</span>\n  <span class="hljs-tag">&lt;<span class="hljs-name">m-setps-item</span> <span class="hljs-attr">title</span>=<span class="hljs-string">&quot;\u6210\u7EE9\u5355\u8BBE\u7F6E&quot;</span> /&gt;</span>\n  <span class="hljs-tag">&lt;<span class="hljs-name">m-setps-item</span> <span class="hljs-attr">title</span>=<span class="hljs-string">&quot;\u9884\u89C8\u6210\u7EE9\u5355&quot;</span> /&gt;</span>\n<span class="hljs-tag">&lt;/<span class="hljs-name">m-setps</span>&gt;</span>\n</code></pre>\n<pre><code class="language-js"><span class="hljs-keyword">import</span> { ref } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vue&#x27;</span>;\n\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {\n  <span class="hljs-title function_">setup</span>(<span class="hljs-params"></span>) {\n    <span class="hljs-keyword">const</span> active = <span class="hljs-title function_">ref</span>(<span class="hljs-number">1</span>);\n    <span class="hljs-keyword">return</span> { active };\n  },\n};\n</code></pre>\n</div><div class="van-doc-card"><h3 id="zi-ding-yi-yang-shi" tabindex="-1">\u81EA\u5B9A\u4E49\u6837\u5F0F</h3>\n<p>\u53EF\u4EE5\u901A\u8FC7 <code>active-icon</code> \u548C <code>active-color</code> \u5C5E\u6027\u8BBE\u7F6E\u6FC0\u6D3B\u72B6\u6001\u4E0B\u7684\u56FE\u6807\u548C\u989C\u8272\u3002</p>\n<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">m-setps</span> <span class="hljs-attr">:active</span>=<span class="hljs-string">&quot;0&quot;</span> <span class="hljs-attr">active-icon</span>=<span class="hljs-string">&quot;success&quot;</span> <span class="hljs-attr">active-color</span>=<span class="hljs-string">&quot;#ed6a0c&quot;</span>&gt;</span>\n  <span class="hljs-tag">&lt;<span class="hljs-name">m-setps-item</span> <span class="hljs-attr">title</span>=<span class="hljs-string">&quot;\u4E0A\u4F20\u6210\u7EE9\u5355&quot;</span> /&gt;</span>\n  <span class="hljs-tag">&lt;<span class="hljs-name">m-setps-item</span> <span class="hljs-attr">title</span>=<span class="hljs-string">&quot;\u6210\u7EE9\u5355\u8BBE\u7F6E&quot;</span> /&gt;</span>\n  <span class="hljs-tag">&lt;<span class="hljs-name">m-setps-item</span> <span class="hljs-attr">title</span>=<span class="hljs-string">&quot;\u9884\u89C8\u6210\u7EE9\u5355&quot;</span> /&gt;</span>\n<span class="hljs-tag">&lt;/<span class="hljs-name">m-setps</span>&gt;</span>\n</code></pre>\n</div><div class="van-doc-card"><h3 id="shu-xiang-bu-zou-tiao" tabindex="-1">\u7AD6\u5411\u6B65\u9AA4\u6761</h3>\n<p>\u53EF\u4EE5\u901A\u8FC7\u8BBE\u7F6E <code>direction</code> \u5C5E\u6027\u6765\u6539\u53D8\u6B65\u9AA4\u6761\u7684\u663E\u793A\u65B9\u5411\u3002</p>\n<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">m-setps</span> <span class="hljs-attr">:active</span>=<span class="hljs-string">&quot;0&quot;</span> <span class="hljs-attr">direction</span>=<span class="hljs-string">&quot;vertical&quot;</span>&gt;</span>\n  <span class="hljs-tag">&lt;<span class="hljs-name">m-setps-item</span>&gt;</span>\n    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>\u3010\u57CE\u5E02\u3011\u7269\u6D41\u72B6\u60011<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>\n    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>2016-07-12 12:40<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>\n  <span class="hljs-tag">&lt;/<span class="hljs-name">m-setps-item</span>&gt;</span>\n  <span class="hljs-tag">&lt;<span class="hljs-name">vm-setps-item</span>&gt;</span>\n    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>\u3010\u57CE\u5E02\u3011\u7269\u6D41\u72B6\u60012<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>\n    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>2016-07-11 10:00<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>\n  <span class="hljs-tag">&lt;/<span class="hljs-name">vm-setps-item</span>&gt;</span>\n  <span class="hljs-tag">&lt;<span class="hljs-name">m-setps-item</span>&gt;</span>\n    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>\u5FEB\u4EF6\u5DF2\u53D1\u8D27<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>\n    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>2016-07-10 09:30<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>\n  <span class="hljs-tag">&lt;/<span class="hljs-name">m-setps-item</span>&gt;</span>\n<span class="hljs-tag">&lt;/<span class="hljs-name">m-setps</span>&gt;</span>\n</code></pre>\n</div><h2 id="api" tabindex="-1">API</h2>\n<div class="van-doc-card"><h3 id="steps-props" tabindex="-1">Steps Props</h3>\n<table>\n<thead>\n<tr>\n<th>\u53C2\u6570</th>\n<th>\u8BF4\u660E</th>\n<th>\u7C7B\u578B</th>\n<th>\u9ED8\u8BA4\u503C</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>active</td>\n<td>\u5F53\u524D\u6B65\u9AA4\u5BF9\u5E94\u7684\u7D22\u5F15\u503C</td>\n<td><em>number | string</em></td>\n<td><code>0</code></td>\n</tr>\n<tr>\n<td>direction</td>\n<td>\u6B65\u9AA4\u6761\u65B9\u5411\uFF0C\u53EF\u9009\u503C\u4E3A <code>vertical</code></td>\n<td><em>string</em></td>\n<td><code>horizontal</code></td>\n</tr>\n<tr>\n<td>active-icon</td>\n<td>\u6FC0\u6D3B\u72B6\u6001\u7684\u56FE\u6807</td>\n<td><em>string</em></td>\n<td>-</td>\n</tr>\n<tr>\n<td>inactive-icon</td>\n<td>\u672A\u6FC0\u6D3B\u72B6\u6001\u56FE\u6807</td>\n<td><em>string</em></td>\n<td>-</td>\n</tr>\n<tr>\n<td>active-color</td>\n<td>\u6FC0\u6D3B\u72B6\u6001\u989C\u8272</td>\n<td><em>string</em></td>\n<td><code>#3c9cff</code></td>\n</tr>\n<tr>\n<td>inactive-color</td>\n<td>\u672A\u6FC0\u6D3B\u72B6\u6001\u989C\u8272</td>\n<td><em>string</em></td>\n<td><code>#969799</code></td>\n</tr>\n<tr>\n<td>icon-size</td>\n<td>\u56FE\u6807\u5927\u5C0F</td>\n<td><em>number</em></td>\n<td><code>17</code></td>\n</tr>\n</tbody>\n</table>\n</div><div class="van-doc-card"><h3 id="stepitem-props" tabindex="-1">StepItem Props</h3>\n<table>\n<thead>\n<tr>\n<th>\u53C2\u6570</th>\n<th>\u8BF4\u660E</th>\n<th>\u7C7B\u578B</th>\n<th>\u9ED8\u8BA4\u503C</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>title</td>\n<td>\u6807\u9898\u6587\u5B57</td>\n<td><em>string</em></td>\n<td>-</td>\n</tr>\n<tr>\n<td>error</td>\n<td>\u662F\u5F53\u524D\u6B65\u9AA4\u662F\u5426\u5904\u4E8E\u5931\u8D25\u72B6\u6001</td>\n<td><em>boolean</em></td>\n<td><code>false</code></td>\n</tr>\n</tbody>\n</table>\n</div><div class="van-doc-card"><h3 id="steps-events" tabindex="-1">Steps Events</h3>\n<table>\n<thead>\n<tr>\n<th>\u4E8B\u4EF6\u540D</th>\n<th>\u8BF4\u660E</th>\n<th>\u56DE\u8C03\u53C2\u6570</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>click-step</td>\n<td>\u70B9\u51FB\u6B65\u9AA4\u7684\u6807\u9898\u6216\u56FE\u6807\u65F6\u89E6\u53D1</td>\n<td><em>index: number</em></td>\n</tr>\n</tbody>\n</table>\n</div>'},null,8,l))}}}]);