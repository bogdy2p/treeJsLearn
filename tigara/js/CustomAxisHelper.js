function drawAxes(size,position, rotation) {
            size = size || 1;
            var vertices = new Float32Array( [
            0, 0, 0, size, 0, 0,
            0, 0, 0, 0, size, 0,
            0, 0, 0, 0, 0, size
            ] );
            var colors = new Float32Array( [
            1, 0, 0, 1, 0.6, 0,
            0, 1, 0, 0.6, 1, 0,
            0, 0, 1, 0, 0.6, 1
            ] );
            var geometry = new THREE.BufferGeometry();
            geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
            geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );
            var material = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors } );
            var mesh = new THREE.Line(geometry, material, THREE.LinePieces );
            mesh.position.set(position.x, position.y, position.z);
            mesh.rotation.set(rotation.x, rotation.y, rotation.z);
            return mesh;
        }