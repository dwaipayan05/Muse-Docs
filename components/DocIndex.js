import Icon from "@material-tailwind/react/Icon";
import Button from "@material-tailwind/react/Button"
function DocIndex() {
  return (
      <section className="bg-white px-10 md:px-0">
        <div className="max-w-3xl mx-auto py-8">
          <div className="flex items-center justify-between pb-5 text-gray-700">
            <h2 className="font-medium flex-grow">Documents</h2>
            <p className="font-medium mr-12">Date Created</p>
             <Button
            color="lightBlue"
            buttonType="outline"
            rounded={true}
            iconOnly={true}
            ripple="dark"
            className = "ml-1 md:ml-20 h-20 w-20 border-0"
              >
                <Icon name="piano" size="3xl" color = "gray" />
              </Button>
            
          </div>
        </div>
      </section>
  );
}

export default DocIndex;
