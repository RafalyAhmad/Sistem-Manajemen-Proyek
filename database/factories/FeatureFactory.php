<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Feature>
 */
class FeatureFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'feature_name' => $this->faker->word,
            'description' => $this->faker->sentence,
            'external_input' => 2,
            'external_output' => 3,
            'logical_internal_file' => 4,
            'external_interface_file' => 1,
            'external_inquiry' => 2,
            'feature_cfp' => 30,
        ];
    }
}
