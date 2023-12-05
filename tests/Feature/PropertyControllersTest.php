<?php

namespace Tests\Feature;

use App\Models\Property;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Response;
use Tests\TestCase;

class PropertyControllersTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test list property.
     */
    public function test_list_property_returns_correct_data(): void
    {
        Property::factory(25)->create();

        $this->getJson('/api/property')
            ->assertStatus(Response::HTTP_OK)
            ->assertJsonCount(20, 'data')
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'name',
                        'address',
                        'created_at',
                        'updated_at',
                    ]
                ]
            ]);
    }

    /**
     * Test show property.
     */
    public function test_show_property_returns_correct_data(): void
    {
        $property = Property::factory()->create();

        $this->getJson(sprintf('/api/property/%s', $property->getKey()))
            ->assertStatus(Response::HTTP_OK)
            ->assertExactJson([
                'data' => [
                    'id' => $property->getKey(),
                    'name' => $property->name,
                    'address' => $property->address,
                    'created_at' => $property->created_at,
                    'updated_at' => $property->updated_at,
                ]
            ]);
    }

    /**
     * Test show property with invalid id.
     */
    public function test_show_property_with_invalid_id_is_unsucessful(): void
    {
        $this->getJson('/api/property/0')
            ->assertStatus(Response::HTTP_NOT_FOUND);
    }

    /**
     * Test store property.
     */
    public function test_store_property_is_successful(): void
    {
        $data = Property::factory()->make();

        $this->postJson('/api/property', [
                'name' => $data->name,
                'address' => $data->address,
            ])
            ->assertStatus(Response::HTTP_CREATED)
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'name',
                    'address',
                    'created_at',
                    'updated_at',
                ]
            ]);

        $this->assertDatabaseHas('properties', $data->toArray());
    }

    /**
     * Test store property with missing data.
     */
    public function test_store_property_with_missing_data_is_unsuccessful(): void
    {
        $data = Property::factory()->make();

        $this->postJson('/api/property', [
                'name' => $data->name,
                // 'address' => $data->address,
            ])
            ->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    /**
     * Test update property.
     */
    public function test_update_property_is_successful(): void
    {
        $property = Property::factory()->create();

        $data = Property::factory()->make();

        $this->putJson(sprintf('/api/property/%s', $property->getKey()), [
            'name' => $data->name,
            'address' => $data->address,
        ])
            ->assertStatus(Response::HTTP_OK)
            ->assertExactJson([
                'data' => [
                    'id' => $property->getKey(),
                    'name' => $data->name,
                    'address' => $data->address,
                    'created_at' => $property->created_at,
                    'updated_at' => $property->updated_at,
                ]
            ]);
    }

    /**
     * Test update property with invalid id.
     */
    public function test_update_property_with_invalid_id_is_unsucessful(): void
    {
        $this->putJson('/api/property/0')
            ->assertStatus(Response::HTTP_NOT_FOUND);
    }

    /**
     * Test destroy property.
     */
    public function test_destroy_property_is_successful(): void
    {
        $property = Property::factory()->create();

        $this->deleteJson(sprintf('/api/property/%s', $property->getKey()))
            ->assertStatus(Response::HTTP_NO_CONTENT);

        $this->assertDatabaseMissing('properties', $property->toArray());
    }

    /**
     * Test destroy property with invalid id.
     */
    public function test_destroy_property_with_invalid_id_is_unsucessful(): void
    {
        $this->deleteJson('/api/property/0')
            ->assertStatus(Response::HTTP_NOT_FOUND);
    }
}
