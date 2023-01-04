Setting up applications sometimes requires setting up 
configuration settings for different things and those
settings can be dependent on the current environment
(prod, dev).

Different module in nest need integrate with other modules
or 3rd party application and the same config requirements apply to them.
Handling config based on environment is not meant to be done
on the module trying to integrate with other modules/apps.

so using a ConfigModule helps solve that problem and it encapsulates all that away from the module.


# Getting Started
we could create a module form scrath to handle this but we would be using @nest/config  mdoule
we need to install it first

CMD
-  npm i --save @nestjs/config
  The @nestjs/config package internally uses dotenv.

Custom env file path#
By default, the package looks for a .env file in the root directory of the application. To specify another path for the .env file, set the envFilePath property of an (optional) options object you pass to forRoot(), as follows:


ConfigModule.forRoot({
  envFilePath: '.development.env',
});
You can also specify multiple paths for .env files like this:


ConfigModule.forRoot({
  envFilePath: ['.env.development.local', '.env.development'],
});
If a variable is found in multiple files, the first one takes precedence.

# Note
isGlobal makes providers of a module acccesible to any module without importing the module

# Custom Configuration files
There are cases where you need to set a particular config based on a condition or set a config to default if env file is not present

we are able to do this by creating acustom config file that returns an object of config.

# Get Config 
constructor(private configService: ConfigService) {}
// get an environment variable
const dbUser = this.configService.get<string>('DATABASE_USER');

// get a custom configuration value
const dbHost = this.configService.get<string>('database.host');

# Validating Environment variables
  Schema validation with joi 
  * Define and pass a Joi validation schema via the 
  validationSchema property of forRoot
  import * as Joi from 'joi';

    @Module({
      imports: [
        ConfigModule.forRoot({
          validationSchema: Joi.object({
            NODE_ENV: Joi.string()
              .valid('development', 'production', 'test', 'provision')
              .default('development'),
            PORT: Joi.number().default(3000),
          }),
        }),
      ],
    })
    export class AppModule {}

# Custom Valide function
Apart from using joi we could use a custom validate function to validate env 

Joi resticts setting up validation based on different
envs as it make the configModule long


# Resources
(https://stackoverflow.com/questions/73626586/nestjs-how-to-use-configmodule-values-in-another-module)
