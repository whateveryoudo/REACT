import Authorized from './Authorized'
import  CheckPermissions from './CheckPermissions'
import renderAuthorize from './renderAuthorize'


Authorized.check = CheckPermissions;


export default renderAuthorize(Authorized);//为毛这样写



