export function isPlainObject(item){
    return item && typeof item==="object" && item.constructor===Object;
}

export  function deepmerge(target,source,options={clone:true}){
    const output=options.clone?{...target}:target;

    if(isPlainObject(target) && isPlainObject(source)){
        Object.keys(source).forEach(key=>{
            if(key==='__proto__'){
                return ;
            }

            if(isPlainObject(source[key] && key in target)){
                output[key]=deepmerge(target[key],source[key],options);
            }else{
                output[key]=source[key];
            }
        })
    }

    return output;
}