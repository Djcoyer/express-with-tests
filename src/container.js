 class Container {


    //Create map of key/value pairs for services and singletons
    constructor() {
        this._services = new Map();
        this._singletons = new Map();
    }


    //Register a dependency with key of name, 
    //value of the implementation and dependencies of that implementation
    register(name, definition, dependencies) {
        this._services.set(name, {definition, dependencies});
    }

    singleton(name, definition, dependencies) {
        this._singletons.set(name, {definition, dependencies});
    }
    
    //Get the dependency from the map
    get(name) {
        const c = this._services.get(name);

        //If the stored dependency's definition is a class, resolve dependencies and return
        if(this._isClass(c.definition)) {
            if(c.singleton) {
                const singletonInstance = this._singletons.get(name);
                if(singletonInstance) {
                    return singletonInstance;
                } else {
                    const newSingletonInstance = this.createInstance(c);
                    this._singletons.set(name, newSingletonInstance);
                    return newSingletonInstance;
                }
            }

            return this._createInstance(c);
        } else {
            return c.definition;
        }
    }

    //Retrieve dependencies for the service from container
    _getResolvedDependencies(service) {
        let classDependencies = [];
        if(service.dependencies) {
            classDependencies = service.dependencies.map((dep) => {
                //All dependencies need to already be registered in the container
                return this.get(dep);
            });
        }
        return classDependencies;
    }

    //Instantiate the class to return using the dependencies supplied at registration
    _createInstance(service) {
        return new service.definition(...this._getResolvedDependencies(service));
    }

    _isClass(definition) {

        return typeof definition === 'function';
    }
 }

 module.exports = Container;