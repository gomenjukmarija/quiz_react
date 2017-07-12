
<?php
use Illuminate\Database\Seeder;
class RolesTablesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      DB::statement('SET FOREIGN_KEY_CHECKS = 0');
        DB::table('roles')->truncate(); //транкейтишь таблицу
        DB::statement('SET FOREIGN_KEY_CHECKS = 1');
      $faker = Faker\Factory::create();
      App\Role::create([
        'name' => 'admin',
        'display_name' => 'admin',
        'description' => $faker->sentence
        ]);
      App\Role::create([
        'name' => 'client',
        'display_name' => 'client',
        'description' => $faker->sentence
        ]);
    }
}