/**
 * url���  npm install url
 * url: http://user:pass@host.com:80/resource/path/?query=xxx#hash
 *      Э��     �����֤  ����  �˿�         ·��     ��ѯ   ɢ��hash
 * url.parse(urlStr, [parseQueryString], [slashesDenoteHost])
 *                   true:����ΪJSON      true: ����Ϊ{host: 'host', pathname: '/path'} ���� {pathname:'//host/path'}
 *
 * ����: href/protocol/host/auth/hostname/port/pathname/search/path/query/hash
 * url.format(urlObj);    //ת��Ϊurl�ַ���
 * url.resolve(form, to); //һ�������ض������url��д(ֻ�ܸı�˿ں�֮�����Դ·��,��ѯ,hash)
 */

var url = require('url');
var urlStr = 'http://user:pass@host.com:8080/resource/path?query=xxx#hash';
var urlObj = url.parse(urlStr,true,true);
console.log(JSON.stringify(urlObj));
var urlString  =url.format(urlObj);
console.log(urlString);
