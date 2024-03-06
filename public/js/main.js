/**
 * Static files respective java-script files will be placed here
 * These files also include client side code ,i.e the code that will not be executed with NodeJS or express
 * example: - confirm() , fetch(),etc are functions not available for server side. These can only be executed in
 * client side.
 * 
 */

function deleteProduct(id)
{
    const result = confirm("Are You sure you want to delete this product ?");

    if(result)
    {
        fetch('/delete-product/'+id,{
            method: "POST"
        })
        .then(res)
        {
            if(res.ok)
            {
                location.reload();
            }
        }
    }

}