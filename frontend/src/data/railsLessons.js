export const railsLessons = [
  {
    id: 'rails-intro',
    title: 'Introduction to Rails',
    description: 'Learn the basics of Ruby on Rails framework',
    lessons: [
      {
        id: 'what-is-rails',
        title: 'What is Ruby on Rails?',
        content: `# Ruby on Rails

## What is this?

Ruby on Rails (or just "Rails") is like a toolkit for building websites and web apps. Instead of building everything from scratch, Rails gives you ready-made tools and structures - like having LEGO blocks instead of having to carve your own blocks from wood!

## What is Rails?

Ruby on Rails is a web application framework written in Ruby. It follows the Model-View-Controller (MVC) architectural pattern.

## Key Principles

**Convention over Configuration**: Rails makes assumptions about what you want to do and how you're going to do it, rather than requiring you to specify every detail through configuration files.

**Don't Repeat Yourself (DRY)**: Every piece of knowledge should have a single, authoritative representation within the system.

## MVC Architecture

- **Model**: Handles data and business logic
- **View**: Handles the user interface
- **Controller**: Handles requests and coordinates between Model and View

## Rails Philosophy

Rails is designed to make programming web applications easier by making assumptions about what every developer needs to get started.

In the following lessons, you'll learn how to build web applications with Rails!`,
        starterCode: `# Rails uses Ruby, so let's review some Ruby basics
class User
  attr_accessor :name, :email

  def initialize(name, email)
    @name = name
    @email = email
  end

  def display_info
    "Name: #{@name}, Email: #{@email}"
  end
end

user = User.new("Alice", "alice@example.com")
puts user.display_info
`,
        solution: `class User
  attr_accessor :name, :email

  def initialize(name, email)
    @name = name
    @email = email
  end

  def display_info
    "Name: #{@name}, Email: #{@email}"
  end
end

user = User.new("Alice", "alice@example.com")
puts user.display_info`,
        type: 'tutorial'
      },
      {
        id: 'rails-structure',
        title: 'Rails Application Structure',
        content: `# Rails Application Structure

## What is this?

When you create a Rails app, it automatically creates a bunch of folders and files for you - like setting up a filing cabinet with labeled drawers. Each folder has a specific purpose, so you always know where to put things. It keeps your code organized!

## The Structure

When you create a new Rails app, it generates a specific directory structure:

\`\`\`
app/
  controllers/   # Handle requests
  models/        # Data layer
  views/         # Templates
  helpers/       # View helpers
config/
  routes.rb      # URL routing
  database.yml   # Database config
db/
  migrate/       # Database migrations
public/          # Static files
test/            # Tests
Gemfile          # Dependencies
\`\`\`

## Key Directories

**app/**: Contains the main application code
- **controllers/**: Process requests and prepare data
- **models/**: Define database tables and business logic
- **views/**: HTML templates (with embedded Ruby)

**config/**: Configuration files
- **routes.rb**: Maps URLs to controller actions

**db/**: Database-related files
- **migrate/**: Database schema changes

## Creating a Rails App

\`\`\`bash
rails new myapp
cd myapp
rails server
\`\`\`

This creates a new Rails app and starts the development server!`,
        starterCode: `# Rails apps use classes and modules extensively
module MyApp
  class Application
    def self.start
      puts "Starting Rails application..."
      puts "Server running on http://localhost:3000"
    end
  end
end

MyApp::Application.start
`,
        solution: `module MyApp
  class Application
    def self.start
      puts "Starting Rails application..."
      puts "Server running on http://localhost:3000"
    end
  end
end

MyApp::Application.start`,
        type: 'tutorial'
      },
      {
        id: 'routes',
        title: 'Routing in Rails',
        content: `# Rails Routing

## What is this?

Routing is like a GPS for your website! When someone types a URL (like "/about" or "/users/5"), routing tells Rails which code to run. It's the traffic director that sends each visitor to the right place in your app.

## How It Works

The routing system maps URLs to controller actions.

## Basic Routes

In \`config/routes.rb\`:

\`\`\`ruby
Rails.application.routes.draw do
  # GET /welcome
  get 'welcome', to: 'pages#home'

  # POST /users
  post 'users', to: 'users#create'

  # Root route
  root 'pages#home'
end
\`\`\`

## RESTful Routes

Rails provides a shorthand for RESTful resources:

\`\`\`ruby
resources :articles
\`\`\`

This creates 7 routes:
- GET /articles (index)
- GET /articles/new (new)
- POST /articles (create)
- GET /articles/:id (show)
- GET /articles/:id/edit (edit)
- PATCH/PUT /articles/:id (update)
- DELETE /articles/:id (destroy)

## Route Parameters

\`\`\`ruby
get 'users/:id', to: 'users#show'
\`\`\`

In the controller:
\`\`\`ruby
def show
  @user = User.find(params[:id])
end
\`\`\``,
        starterCode: `# Simulating Rails routing logic
class Router
  def self.match(path, method)
    routes = {
      "GET /articles" => "ArticlesController#index",
      "GET /articles/:id" => "ArticlesController#show",
      "POST /articles" => "ArticlesController#create"
    }

    routes.each do |route, action|
      if route.start_with?(method) && match_path?(path, route.split(' ')[1])
        return action
      end
    end

    "404 Not Found"
  end

  def self.match_path?(path, pattern)
    path == pattern || pattern.include?(':')
  end
end

puts Router.match("/articles", "GET")
puts Router.match("/articles/1", "GET")
puts Router.match("/articles", "POST")
`,
        solution: `class Router
  def self.match(path, method)
    routes = {
      "GET /articles" => "ArticlesController#index",
      "GET /articles/:id" => "ArticlesController#show",
      "POST /articles" => "ArticlesController#create"
    }

    routes.each do |route, action|
      if route.start_with?(method) && match_path?(path, route.split(' ')[1])
        return action
      end
    end

    "404 Not Found"
  end

  def self.match_path?(path, pattern)
    path == pattern || pattern.include?(':')
  end
end

puts Router.match("/articles", "GET")
puts Router.match("/articles/1", "GET")
puts Router.match("/articles", "POST")`,
        type: 'tutorial'
      }
    ]
  },
  {
    id: 'rails-models',
    title: 'Models and ActiveRecord',
    description: 'Work with databases using ActiveRecord',
    lessons: [
      {
        id: 'activerecord-basics',
        title: 'ActiveRecord Basics',
        content: `# ActiveRecord

## What is this?

ActiveRecord lets you work with databases using Ruby code instead of writing database language (SQL). It's like having a translator! Instead of saying "SELECT * FROM users", you just say "User.all" in Ruby. Much easier!

## How It Works

ActiveRecord is Rails' Object-Relational Mapping (ORM) layer. It connects classes to database tables.

## Creating a Model

\`\`\`bash
rails generate model Article title:string body:text
rails db:migrate
\`\`\`

This creates:
1. A model file (\`app/models/article.rb\`)
2. A migration file (to create the database table)

## Model Class

\`\`\`ruby
class Article < ApplicationRecord
  # Validations
  validates :title, presence: true
  validates :body, length: { minimum: 10 }
end
\`\`\`

## CRUD Operations

\`\`\`ruby
# Create
article = Article.new(title: "Hello", body: "World")
article.save

# Or
Article.create(title: "Hello", body: "World")

# Read
Article.all
Article.find(1)
Article.where(title: "Hello")

# Update
article.update(title: "New Title")

# Delete
article.destroy
\`\`\``,
        starterCode: `# Simulating ActiveRecord behavior
class Article
  attr_accessor :id, :title, :body

  @@articles = []
  @@next_id = 1

  def initialize(title:, body:)
    @title = title
    @body = body
  end

  def save
    if valid?
      @id = @@next_id
      @@next_id += 1
      @@articles << self
      true
    else
      false
    end
  end

  def valid?
    !@title.nil? && !@title.empty? && @body.length >= 10
  end

  def self.all
    @@articles
  end

  def self.find(id)
    @@articles.find { |a| a.id == id }
  end
end

# Test it
article1 = Article.new(title: "First Post", body: "This is my first article with enough content")
article1.save

article2 = Article.new(title: "Second Post", body: "This is my second article")
article2.save

puts "Total articles: #{Article.all.length}"
puts "First article: #{Article.find(1).title}"
`,
        solution: `class Article
  attr_accessor :id, :title, :body

  @@articles = []
  @@next_id = 1

  def initialize(title:, body:)
    @title = title
    @body = body
  end

  def save
    if valid?
      @id = @@next_id
      @@next_id += 1
      @@articles << self
      true
    else
      false
    end
  end

  def valid?
    !@title.nil? && !@title.empty? && @body.length >= 10
  end

  def self.all
    @@articles
  end

  def self.find(id)
    @@articles.find { |a| a.id == id }
  end
end

article1 = Article.new(title: "First Post", body: "This is my first article with enough content")
article1.save

article2 = Article.new(title: "Second Post", body: "This is my second article")
article2.save

puts "Total articles: #{Article.all.length}"
puts "First article: #{Article.find(1).title}"`,
        type: 'tutorial'
      },
      {
        id: 'validations',
        title: 'Model Validations',
        content: `# ActiveRecord Validations

## What is this?

Validations are like a bouncer at a club - they check if data is acceptable before letting it into your database. If someone tries to create a user without a name, validations say "Nope, you need a name!" It keeps bad data out!

## Why Use Validations?

Validations ensure data integrity before saving to the database.

## Common Validations

\`\`\`ruby
class User < ApplicationRecord
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :age, numericality: { greater_than: 0 }
  validates :password, length: { minimum: 6 }
end
\`\`\`

## Validation Types

- \`presence: true\` - field must not be blank
- \`uniqueness: true\` - field must be unique
- \`length: { minimum: 6 }\` - string length constraints
- \`numericality: { greater_than: 0 }\` - number constraints
- \`format: { with: /regex/ }\` - must match pattern

## Checking Validity

\`\`\`ruby
user = User.new(name: "", email: "test@test.com")
user.valid?   # => false
user.errors.full_messages  # => ["Name can't be blank"]
\`\`\``,
        starterCode: `# Simulating Rails validations
class User
  attr_accessor :name, :email, :age
  attr_reader :errors

  def initialize(name:, email:, age:)
    @name = name
    @email = email
    @age = age
    @errors = []
  end

  def valid?
    @errors = []

    if @name.nil? || @name.empty?
      @errors << "Name can't be blank"
    end

    if @email.nil? || @email.empty?
      @errors << "Email can't be blank"
    end

    if @age.nil? || @age <= 0
      @errors << "Age must be greater than 0"
    end

    @errors.empty?
  end

  def save
    if valid?
      puts "User saved successfully!"
      true
    else
      puts "Validation failed:"
      @errors.each { |error| puts "  - #{error}" }
      false
    end
  end
end

# Test validations
user1 = User.new(name: "", email: "test@test.com", age: 25)
user1.save

user2 = User.new(name: "Alice", email: "alice@test.com", age: 30)
user2.save
`,
        solution: `class User
  attr_accessor :name, :email, :age
  attr_reader :errors

  def initialize(name:, email:, age:)
    @name = name
    @email = email
    @age = age
    @errors = []
  end

  def valid?
    @errors = []

    if @name.nil? || @name.empty?
      @errors << "Name can't be blank"
    end

    if @email.nil? || @email.empty?
      @errors << "Email can't be blank"
    end

    if @age.nil? || @age <= 0
      @errors << "Age must be greater than 0"
    end

    @errors.empty?
  end

  def save
    if valid?
      puts "User saved successfully!"
      true
    else
      puts "Validation failed:"
      @errors.each { |error| puts "  - #{error}" }
      false
    end
  end
end

user1 = User.new(name: "", email: "test@test.com", age: 25)
user1.save

user2 = User.new(name: "Alice", email: "alice@test.com", age: 30)
user2.save`,
        type: 'tutorial'
      },
      {
        id: 'associations',
        title: 'Model Associations',
        content: `# ActiveRecord Associations

## What is this?

Associations connect different models together, like how people are connected in real life. An Author has many Books, and each Book belongs to an Author. Rails makes it super easy to say "show me all books by this author!"

## Why Use Associations?

Associations define relationships between models, making it easy to work with related data.

## Types of Associations

**Has Many / Belongs To**

\`\`\`ruby
class Author < ApplicationRecord
  has_many :books
end

class Book < ApplicationRecord
  belongs_to :author
end
\`\`\`

Usage:
\`\`\`ruby
author = Author.create(name: "J.K. Rowling")
book = author.books.create(title: "Harry Potter")
book.author  # => returns the author
\`\`\`

**Has Many Through**

\`\`\`ruby
class Doctor < ApplicationRecord
  has_many :appointments
  has_many :patients, through: :appointments
end

class Patient < ApplicationRecord
  has_many :appointments
  has_many :doctors, through: :appointments
end

class Appointment < ApplicationRecord
  belongs_to :doctor
  belongs_to :patient
end
\`\`\`

**Has One**

\`\`\`ruby
class User < ApplicationRecord
  has_one :profile
end

class Profile < ApplicationRecord
  belongs_to :user
end
\`\`\``,
        starterCode: `# Simulating Rails associations
class Author
  attr_accessor :name, :books

  def initialize(name)
    @name = name
    @books = []
  end

  def add_book(book)
    @books << book
    book.author = self
  end
end

class Book
  attr_accessor :title, :author

  def initialize(title)
    @title = title
  end
end

# Test associations
author = Author.new("J.K. Rowling")
book1 = Book.new("Harry Potter 1")
book2 = Book.new("Harry Potter 2")

author.add_book(book1)
author.add_book(book2)

puts "Author: #{author.name}"
puts "Books by #{author.name}:"
author.books.each do |book|
  puts "  - #{book.title}"
end

puts "\nBook 1 author: #{book1.author.name}"
`,
        solution: `class Author
  attr_accessor :name, :books

  def initialize(name)
    @name = name
    @books = []
  end

  def add_book(book)
    @books << book
    book.author = self
  end
end

class Book
  attr_accessor :title, :author

  def initialize(title)
    @title = title
  end
end

author = Author.new("J.K. Rowling")
book1 = Book.new("Harry Potter 1")
book2 = Book.new("Harry Potter 2")

author.add_book(book1)
author.add_book(book2)

puts "Author: #{author.name}"
puts "Books by #{author.name}:"
author.books.each do |book|
  puts "  - #{book.title}"
end

puts "\nBook 1 author: #{book1.author.name}"`,
        type: 'tutorial'
      }
    ]
  },
  {
    id: 'rails-controllers',
    title: 'Controllers and Views',
    description: 'Handle requests and render responses',
    lessons: [
      {
        id: 'controllers',
        title: 'Rails Controllers',
        content: `# Rails Controllers

## What is this?

Controllers are like the managers of your app - they receive requests from users, fetch the right data from the database, and decide what to show back. When someone visits "/articles", the controller says "get all articles and show them!"

## How It Works

Controllers handle incoming requests and coordinate the response.

## Basic Controller

\`\`\`ruby
class ArticlesController < ApplicationController
  def index
    @articles = Article.all
  end

  def show
    @article = Article.find(params[:id])
  end

  def new
    @article = Article.new
  end

  def create
    @article = Article.new(article_params)

    if @article.save
      redirect_to @article
    else
      render :new
    end
  end

  private

  def article_params
    params.require(:article).permit(:title, :body)
  end
end
\`\`\`

## Controller Actions

Common RESTful actions:
- **index**: List all resources
- **show**: Display one resource
- **new**: Form for new resource
- **create**: Save new resource
- **edit**: Form for editing
- **update**: Save changes
- **destroy**: Delete resource

## Strong Parameters

Required for security to prevent mass assignment vulnerabilities.`,
        starterCode: `# Simulating a Rails controller
class ArticlesController
  attr_reader :params

  def initialize(params = {})
    @params = params
    @articles = []
  end

  def index
    puts "Listing all articles:"
    @articles.each_with_index do |article, i|
      puts "#{i + 1}. #{article[:title]}"
    end
  end

  def show
    id = @params[:id]
    article = @articles[id.to_i - 1]
    if article
      puts "Title: #{article[:title]}"
      puts "Body: #{article[:body]}"
    else
      puts "Article not found"
    end
  end

  def create
    article = {
      title: @params[:title],
      body: @params[:body]
    }
    @articles << article
    puts "Article created successfully!"
  end
end

# Simulate requests
controller = ArticlesController.new
controller.create.tap { controller.params[:title] = "First Post" }
`,
        solution: `class ArticlesController
  attr_reader :params

  def initialize(params = {})
    @params = params
    @articles = []
  end

  def index
    puts "Listing all articles:"
    @articles.each_with_index do |article, i|
      puts "#{i + 1}. #{article[:title]}"
    end
  end

  def show
    id = @params[:id]
    article = @articles[id.to_i - 1]
    if article
      puts "Title: #{article[:title]}"
      puts "Body: #{article[:body]}"
    else
      puts "Article not found"
    end
  end

  def create
    article = {
      title: @params[:title],
      body: @params[:body]
    }
    @articles << article
    puts "Article created successfully!"
  end
end

controller = ArticlesController.new
controller.create.tap { controller.params[:title] = "First Post" }`,
        type: 'tutorial'
      },
      {
        id: 'views',
        title: 'Views and ERB',
        content: `# Views in Rails

## What is this?

Views are the HTML pages that users actually see in their browser! They're like templates where you can mix HTML with Ruby code to show dynamic content. Instead of writing 100 separate pages, you write one template that fills in the blanks!

## How It Works

Views are templates that generate HTML responses. Rails uses ERB (Embedded Ruby).

## ERB Syntax

\`\`\`erb
<!-- Output with = -->
<h1><%= @article.title %></h1>

<!-- Execute without output (no =) -->
<% @articles.each do |article| %>
  <p><%= article.title %></p>
<% end %>
\`\`\`

## Example View

\`\`\`erb
<!-- app/views/articles/index.html.erb -->
<h1>All Articles</h1>

<% @articles.each do |article| %>
  <div class="article">
    <h2><%= link_to article.title, article_path(article) %></h2>
    <p><%= article.body.truncate(100) %></p>
  </div>
<% end %>

<%= link_to "New Article", new_article_path %>
\`\`\`

## Layouts

The default layout wraps all views:

\`\`\`erb
<!-- app/views/layouts/application.html.erb -->
<!DOCTYPE html>
<html>
  <head>
    <title>My App</title>
  </head>
  <body>
    <%= yield %>
  </body>
</html>
\`\`\``,
        starterCode: `# Simulating ERB template rendering
class ERBTemplate
  def initialize(template)
    @template = template
  end

  def render(variables = {})
    result = @template.dup

    # Simple variable substitution
    variables.each do |key, value|
      result.gsub!("\#{#{key}}", value.to_s)
    end

    result
  end
end

# Example template
template = ERBTemplate.new("<h1>#{title}</h1><p>#{body}</p>")

# Render with variables
html = template.render(
  title: "Welcome to Rails",
  body: "This is an example of template rendering"
)

puts html
`,
        solution: `class ERBTemplate
  def initialize(template)
    @template = template
  end

  def render(variables = {})
    result = @template.dup

    variables.each do |key, value|
      result.gsub!("\#{#{key}}", value.to_s)
    end

    result
  end
end

template = ERBTemplate.new("<h1>#{title}</h1><p>#{body}</p>")

html = template.render(
  title: "Welcome to Rails",
  body: "This is an example of template rendering"
)

puts html`,
        type: 'tutorial'
      }
    ]
  }
];
